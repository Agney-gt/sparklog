'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function SkillTracker() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    async function fetchSkills() {
      const { data } = await supabase.from('skills').select('*');
      setSkills(data || []);
    }
    fetchSkills();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Skill Tracker</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skill.id}>{skill.name}: {skill.current}/{skill.max}</li>
        ))}
      </ul>
    </div>
  );
}
