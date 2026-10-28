import type { Metadata } from "next";
import "./style.css";

export const metadata: Metadata = { 
  title: {default:"InnBuddy — WEB × OPERATION × BRANDING",template:"%s | InnBuddy"}, 
  description:"InnBuddy — WEB、ホテル運営、ブランディング、地域観光に関する200記事のジャーナル", 
  robots:{index:true,follow:true} 
};

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return <div className="journal-wrapper">{children}</div>;
}