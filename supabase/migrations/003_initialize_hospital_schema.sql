-- Migration: 003_initialize_hospital_schema.sql
-- Description: Sets up the hospital schema for the Clinical/Hospital domain and core RLS helper functions.

-- 1. Create Schema
CREATE SCHEMA IF NOT EXISTS hospital;

-- 2. RLS Helper Function (Created in public for shared use)
CREATE OR REPLACE FUNCTION public.check_membership(
  target_role public.user_role,
  target_context public.context_type,
  target_id text DEFAULT 'all'
)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.context_memberships
    WHERE user_id = auth.uid()
      AND role = target_role
      AND context_type = target_context
      AND (context_id = target_id OR context_id = 'all')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Doctors table
CREATE TABLE IF NOT EXISTS hospital.doctors (
    id uuid REFERENCES public.profiles(id) PRIMARY KEY,
    specialty text NOT NULL,
    license_number text UNIQUE NOT NULL,
    bio text,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now()
);

-- 4. Patients table
CREATE TABLE IF NOT EXISTS hospital.patients (
    id uuid REFERENCES public.profiles(id) PRIMARY KEY,
    blood_group text,
    medical_record_number text UNIQUE,
    emergency_contact jsonb,
    created_at timestamptz DEFAULT now()
);

-- 5. Appointments
CREATE TABLE IF NOT EXISTS hospital.appointments (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    doctor_id uuid REFERENCES hospital.doctors(id),
    patient_id uuid REFERENCES hospital.patients(id),
    scheduled_at timestamptz NOT NULL,
    status text DEFAULT 'scheduled', -- scheduled, completed, cancelled, no_show
    notes text,
    created_at timestamptz DEFAULT now()
);

-- 6. Medical Records (Highly Sensitive)
CREATE TABLE IF NOT EXISTS hospital.medical_records (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    appointment_id uuid REFERENCES hospital.appointments(id),
    patient_id uuid REFERENCES hospital.patients(id),
    doctor_id uuid REFERENCES hospital.doctors(id),
    diagnosis jsonb,
    prescriptions jsonb,
    sensitive_notes text, -- Consider application-layer encryption for this field
    created_at timestamptz DEFAULT now()
);

-- --- RLS POLICIES ---

-- Doctors: Viewable by anyone, but only Content Admins or Super Admins can update
ALTER TABLE hospital.doctors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view doctors" ON hospital.doctors
    FOR SELECT USING (is_active = true);

-- Medical Records: Only the assigned Doctor, the Patient, or Super Admin can view
ALTER TABLE hospital.medical_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Doctors can view assigned records" ON hospital.medical_records
    FOR SELECT USING (
        doctor_id = auth.uid() AND public.check_membership('doctor', 'hospital')
    );

CREATE POLICY "Patients can view own records" ON hospital.medical_records
    FOR SELECT USING (
        patient_id = auth.uid() AND public.check_membership('patient', 'hospital')
    );

-- Appointments: Doctors see their schedule, Patients see their bookings
ALTER TABLE hospital.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Doctors view own schedule" ON hospital.appointments
    FOR SELECT USING (
        doctor_id = auth.uid() AND public.check_membership('doctor', 'hospital')
    );

CREATE POLICY "Patients view own bookings" ON hospital.appointments
    FOR SELECT USING (
        patient_id = auth.uid() AND public.check_membership('patient', 'hospital')
    );
