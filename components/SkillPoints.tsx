import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Skill {
  name: string;
  current: number;
  max: number;
  level: number;
}

export default function SkillPoints() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    async function fetchSkills() {
      let { data } = await supabase.from("skills").select("*");
      setSkills(data || []);
    }
    fetchSkills();
  }, []);

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-lg font-bold">Skill Points</h2>
      {skills.map((skill) => (
        <div key={skill.name} className="my-2">
          <p>{skill.name}: {skill.current} / {skill.max} • LV {skill.level}</p>
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(skill.current / skill.max) * 100}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  );
}
