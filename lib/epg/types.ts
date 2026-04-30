export interface Program {
  title: string;
  start: string;
  end: string;
  category: string;
  description: string;
  source?: "real" | "fallback";
}

export interface ChannelSchedule {
  id: string;
  name: string;
  logo: string;
  desc: string;
  category: string;
  programs: Program[];
}
