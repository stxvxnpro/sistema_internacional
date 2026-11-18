INSERT INTO patients(id, fhirId, fullName, country, bloodType, allergies, status)
VALUES (nextval('patients_SEQ'), 'FHIR-90821', 'María Fernanda Gómez', 'Colombia', 'O+', 'Penicilina / Penicillin', 'ACTIVO')
ON CONFLICT DO NOTHING;

INSERT INTO patients(id, fhirId, fullName, country, bloodType, allergies, status)
VALUES (nextval('patients_SEQ'), 'FHIR-90822', 'Carlos Andrés Méndez', 'España', 'A-', 'Ninguna / None', 'ACTIVO')
ON CONFLICT DO NOTHING;
