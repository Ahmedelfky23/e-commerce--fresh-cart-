import type React from "react";

export interface ArticleItem {
  number?: string;
  lead?: string;
  text: string;
}

export interface Article {
  id: number;
  icon: string;
  heading: string;
  items?: ArticleItem[];
  customContent?: React.ReactNode;
}

export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalPageProps {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

