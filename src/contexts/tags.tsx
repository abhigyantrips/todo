'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { storage } from '@/lib/storage';

export interface Tag {
  id: string;
  title: string;
  emoji: string;
  color: string;
}

interface TagsContextType {
  tags: Tag[];
  addTag: (tagData: Omit<Tag, 'id'>) => void;
  updateTag: (id: string, tagData: Partial<Omit<Tag, 'id'>>) => void;
  deleteTag: (id: string) => void;
}

const TagsContext = createContext<TagsContextType | undefined>(undefined);

export function TagsProvider({ children }: { children: ReactNode }) {
  const [tags, setTags] = useState<Tag[]>(() => storage.getTags());

  const addTag = (tagData: Omit<Tag, 'id'>) => {
    const newTag: Tag = {
      ...tagData,
      id: String(Date.now()), // Simple ID generation
    };
    const updatedTags = [...tags, newTag];
    setTags(updatedTags);
    storage.saveTags(updatedTags);
  };

  const updateTag = (id: string, tagData: Partial<Omit<Tag, 'id'>>) => {
    const updatedTags = tags.map((tag) =>
      tag.id === id ? { ...tag, ...tagData } : tag
    );
    setTags(updatedTags);
    storage.saveTags(updatedTags);
  };

  const deleteTag = (id: string) => {
    const updatedTags = tags.filter((tag) => tag.id !== id);
    setTags(updatedTags);
    storage.saveTags(updatedTags);
  };

  return (
    <TagsContext.Provider value={{ tags, addTag, updateTag, deleteTag }}>
      {children}
    </TagsContext.Provider>
  );
}

export const useTags = () => {
  const context = useContext(TagsContext);
  if (!context) {
    throw new Error('useTags must be used within a TagsProvider');
  }
  return context;
};
