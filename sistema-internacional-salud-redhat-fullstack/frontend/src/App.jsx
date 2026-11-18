import React, { useState, useEffect } from 'react';

const i18n = {
  es: {
    headerTitle: 'Red Internacional de Salud (HIS)',
    ssoBadge: 'Red Hat SSO: Conectado',
    amqBadge: 'AMQ Streams: Sincronizado',
    searchTitle: 'Consulta de Expediente Clínico (HL7 FHIR)',
    searchPlaceholder: 'Ej. FHIR-90821',
    searchBtn: 'Buscar Paciente',
    newPatientTitle: 'Registrar Nuevo Paciente Internacional',
    nameLabel: 'Nombre Completo',
    countryLabel: 'País de Origen',
    bloodLabel: 'Grupo Sanguíneo',
    allergiesLabel: 'Alergias Críticas',
    saveBtn: 'Guardar en Base de Datos',
    statusLabel: 'Estado Clínico',
    savedMsg: 'Paciente registrado exitosamente en PostgreSQL.'
  },
  en: {
    headerTitle: 'International Health Network (HIS)',
    ssoBadge: 'Red Hat SSO: Connected',
    amqBadge: 'AMQ Streams: Synced',
    searchTitle: 'Clinical Record Lookup (HL7 FHIR)',
    searchPlaceholder: 'E.g. FHIR-90821',
    searchBtn: 'Search Patient',
    newPatientTitle: 'Register New International Patient',
    nameLabel: 'Full Name',
    countryLabel: 'Country of Origin',
    bloodLabel: 'Blood Type',
    allergiesLabel: 'Critical Allergies',
    saveBtn: 'Save to Database',
    statusLabel: 'Clinical Status',
    savedMsg: 'Patient successfully saved to PostgreSQL.'
  }
};

export default function App() {
  const [lang, setLang] = useState('es');
  const [queryId, setQueryId] = useState('FHIR-90821');
  const [patient, setPatient] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [form, setForm] = useState({
    fhirId: '',
    fullName: '',
    country: '',
    bloodType: 'O+',
    allergies: 'Ninguna',
    status: 'ACTIVO'
  });

  const t = i18n[lang];
  const API_URL = import.meta.env.VITE_API_URL || '/api/v1/patients';

  const fetchPatient = async (id) => {
    setFeedback('');
    try {
      const res = await fetch(`${API_URL}/${id}`);
      if (res.ok) {
        const data = await res.json();
        setPatient(data);
      } else {
        setPatient(null);
      }
    } catch (err) {
      console.error('Error conectando con API Gateway 3scale:', err);
    }
  };

  useEffect(() => {
    fetchPatient(queryId);
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        const created = await res.json();
        setPatient(created);
        setQueryId(created.fhirId);
        setFeedback(t.savedMsg);
        setForm({ fhirId: '', fullName: '', country: '', bloodType: 'O+', allergies: 'Ninguna', status: 'ACTIVO' });
      }
    } catch (err) {
      console.error('Error registrando paciente:', err);
    }
  };

  return (
    <div style={{ fontFamily: "'Red Hat Text', Arial, sans-serif", backgroundColor: '#f0f0f0', minHeight: '100vh', color: '#151515' }}>
      <header style={{ backgroundColor: '#151515', color: '#ffffff', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '3px solid #ee0000' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 600 }}>{t.headerTitle}</h1>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.35rem', fontSize: '0.8rem' }}>
            <span style={{ color: '#6ec664' }}>● {t.ssoBadge}</span>
            <span style={{ color: '#73bcf7' }}>● {t.amqBadge}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setLang('es')} style={{ padding: '0.4rem 0.8rem', backgroundColor: lang === 'es' ? '#ee0000' : '#333', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>ES</button>
          <button onClick={() => setLang('en')} style={{ padding: '0.4rem 0.8rem', backgroundColor: lang === 'en' ? '#ee0000' : '#333', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>EN</button>
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem', display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        <section style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}>
          <h2 style={{ marginTop: 0, fontSize: '1.1rem', borderBottom: '1px solid #d2d2d2', paddingBottom: '0.5rem' }}>{t.searchTitle}</h2>
          <div style={{ display: 'flex', gap: '0.75rem', margin: '1rem 0' }}>
            <input
              type="text"
              value={queryId}
              onChange={(e) => setQueryId(e.target.value)}
              placeholder={t.searchPlaceholder}
              style={{ padding: '0.5rem', width: '260px', border: '1px solid #8a8d90', borderRadius: '3px' }}
            />
            <button onClick={() => fetchPatient(queryId)} style={{ padding: '0.5rem 1.2rem', backgroundColor: '#0066cc', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer', fontWeight: 600 }}>
              {t.searchBtn}
            </button>
          </div>

          {patient && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderLeft: '4px solid #0066cc' }}>
                <small style={{ color: '#6a6e73' }}>ID FHIR / {t.nameLabel}</small>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', marginTop: '0.25rem' }}>{patient.fhirId} - {patient.fullName}</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderLeft: '4px solid #3e8635' }}>
                <small style={{ color: '#6a6e73' }}>{t.countryLabel}</small>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', marginTop: '0.25rem' }}>{patient.country}</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderLeft: '4px solid #ee0000' }}>
                <small style={{ color: '#6a6e73' }}>{t.bloodLabel} / {t.allergiesLabel}</small>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', marginTop: '0.25rem' }}>{patient.bloodType} ({patient.allergies})</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderLeft: '4px solid #f0ab00' }}>
                <small style={{ color: '#6a6e73' }}>{t.statusLabel}</small>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', marginTop: '0.25rem', color: '#3e8635' }}>{patient.status}</div>
              </div>
            </div>
          )}
        </section>

        <section style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}>
          <h2 style={{ marginTop: 0, fontSize: '1.1rem', borderBottom: '1px solid #d2d2d2', paddingBottom: '0.5rem' }}>{t.newPatientTitle}</h2>
          {feedback && <p style={{ color: '#3e8635', fontWeight: 600 }}>{feedback}</p>}
          <form onSubmit={handleCreate} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <input required placeholder="ID FHIR (Ej. FHIR-90825)" value={form.fhirId} onChange={(e) => setForm({ ...form, fhirId: e.target.value })} style={{ padding: '0.5rem', border: '1px solid #8a8d90', borderRadius: '3px' }} />
            <input required placeholder={t.nameLabel} value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} style={{ padding: '0.5rem', border: '1px solid #8a8d90', borderRadius: '3px' }} />
            <input required placeholder={t.countryLabel} value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} style={{ padding: '0.5rem', border: '1px solid #8a8d90', borderRadius: '3px' }} />
            <input required placeholder={t.bloodLabel} value={form.bloodType} onChange={(e) => setForm({ ...form, bloodType: e.target.value })} style={{ padding: '0.5rem', border: '1px solid #8a8d90', borderRadius: '3px' }} />
            <input required placeholder={t.allergiesLabel} value={form.allergies} onChange={(e) => setForm({ ...form, allergies: e.target.value })} style={{ padding: '0.5rem', border: '1px solid #8a8d90', borderRadius: '3px' }} />
            <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#3e8635', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer', fontWeight: 600 }}>
              {t.saveBtn}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
