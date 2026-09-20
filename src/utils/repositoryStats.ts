import { searchIndex } from './searchIndex';

export function topicResourceCount(topic: string): number {
  return searchIndex.filter((record) => record.topics.includes(topic)).length;
}
