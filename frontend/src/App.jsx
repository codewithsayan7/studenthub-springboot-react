import React, { useEffect, useState } from 'react';

const API = 'http://localhost:8080/api/students';

const emptyStudent = {
  name: '',
  email: '',
  department: 'Computer Science',
  semester: 1,
  cgpa: 0
};

export default function App() {
  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState('');
  const [form, setForm] = useState(emptyStudent);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setLoading(true);
      setError('');

      try {
        const url = query.trim()
          ? `${API}?q=${encodeURIComponent(query.trim())}`
          : API;
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error('Could not load the student directory.');
        }

        const data = await response.json();
        if (active) setStudents(data);
      } catch (requestError) {
        if (requestError.name !== 'AbortError' && active) {
          setError(requestError.message || 'The student service is unavailable.');
        }
      } finally {
        if (active) setLoading(false);
      }
    }, 250);

    return () => {
      active = false;
      controller.abort();
      clearTimeout(timer);
    };
  }, [query]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: value }));
  }

  function resetForm() {
    setForm(emptyStudent);
    setEditingId(null);
  }

  async function saveStudent(event) {
    event.preventDefault();
    setSaving(true);
    setError('');
    setNotice('');

    const isEditing = editingId !== null;
    const url = isEditing ? `${API}/${editingId}` : API;

    try {
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          semester: Number(form.semester),
          cgpa: Number(form.cgpa)
        })
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.error || 'The student could not be saved.');
      }

      resetForm();
      setNotice(isEditing ? 'Student details updated.' : 'Student added to the directory.');
      setQuery(current => current);
      // Trigger a fresh directory request after a successful write.
      const refreshed = await fetch(API + (query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''));
      if (refreshed.ok) setStudents(await refreshed.json());
    } catch (requestError) {
      setError(requestError.message || 'Something went wrong while saving.');
    } finally {
      setSaving(false);
    }
  }

  function startEditing(student) {
    setEditingId(student.id);
    setForm({
      name: student.name,
      email: student.email,
      department: student.department,
      semester: student.semester,
      cgpa: student.cgpa
    });
    setNotice('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function removeStudent(id) {
    if (!window.confirm('Remove this student from the directory?')) return;

    setError('');
    setNotice('');

    try {
      const response = await fetch(`${API}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('The student could not be removed.');

      setStudents(current => current.filter(student => student.id !== id));
      setNotice('Student removed.');
      if (editingId === id) resetForm();
    } catch (requestError) {
      setError(requestError.message || 'Something went wrong while removing the student.');
    }
  }

  return (
    <main>
      <header>
        <div>
          <span className="eyebrow">ACADEMIC ADMINISTRATION</span>
          <h1>StudentHub</h1>
          <p>A simple place to keep student records organised.</p>
        </div>
        <div className="count">
          {students.length}
          <small>{students.length === 1 ? 'student shown' : 'students shown'}</small>
        </div>
      </header>

      {error && <p className="error" role="alert">{error}</p>}
      {notice && <p className="notice" role="status">{notice}</p>}

      <section className="panel">
        <h2>{editingId ? 'Update student details' : 'Add a student'}</h2>
        <form onSubmit={saveStudent} className="form">
          <input name="name" required maxLength="100" placeholder="Full name" value={form.name} onChange={updateField} />
          <input name="email" required type="email" maxLength="150" placeholder="Email address" value={form.email} onChange={updateField} />
          <input name="department" required maxLength="100" placeholder="Department" value={form.department} onChange={updateField} />
          <input name="semester" required type="number" min="1" max="8" placeholder="Semester" value={form.semester} onChange={updateField} />
          <input name="cgpa" required type="number" min="0" max="10" step="0.01" placeholder="CGPA" value={form.cgpa} onChange={updateField} />
          <button disabled={saving}>{saving ? 'Saving…' : editingId ? 'Save changes' : 'Add student'}</button>
          {editingId && (
            <button type="button" className="secondary" onClick={resetForm}>Cancel</button>
          )}
        </form>
      </section>

      <section className="panel">
        <div className="toolbar">
          <h2>Student directory</h2>
          <input
            aria-label="Search students"
            placeholder="Search by name or email…"
            value={query}
            onChange={event => setQuery(event.target.value)}
          />
        </div>

        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Department</th>
                <th>Semester</th>
                <th>CGPA</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td><b>{student.name}</b><small>{student.email}</small></td>
                  <td>{student.department}</td>
                  <td>{student.semester}</td>
                  <td><span className="score">{Number(student.cgpa).toFixed(2)}</span></td>
                  <td>
                    <button className="small secondary" onClick={() => startEditing(student)}>Edit</button>{' '}
                    <button className="small danger" onClick={() => removeStudent(student.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {loading && <p className="empty" role="status">Loading student records…</p>}
          {!loading && students.length === 0 && (
            <p className="empty">
              {query ? 'No students match that search. Try another name or email.' : 'No students have been added yet.'}
            </p>
          )}
        </div>
      </section>

      <footer>StudentHub · Built with React, Spring Boot and PostgreSQL</footer>
    </main>
  );
}
