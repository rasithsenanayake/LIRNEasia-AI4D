import type { Topic, OrganizationType } from '../types';

export const topics: Topic[] = [
{
  id: 't-governance',
  name: 'AI Governance',
  slug: 'ai-governance',
  description:
  'Policy frameworks, regulation, standards and institutional arrangements shaping how AI is developed and deployed across the region.',
  colorKey: 'governance',
  resourceCount: 64
},
{
  id: 't-innovation',
  name: 'Responsible Innovation',
  slug: 'responsible-innovation',
  description:
  'How teams design, test and deploy AI systems with foresight, participation and accountability built into the process.',
  colorKey: 'innovation',
  resourceCount: 41
},
{
  id: 't-inclusion',
  name: 'Inclusion',
  slug: 'inclusion',
  description:
  'Gender, disability, language and income dimensions of who benefits from AI systems — and who is left out of them.',
  colorKey: 'inclusion',
  resourceCount: 38
},
{
  id: 't-readiness',
  name: 'AI Readiness',
  slug: 'ai-readiness',
  description:
  'Skills, infrastructure, institutions and data foundations that determine whether a country can adopt AI responsibly.',
  colorKey: 'readiness',
  resourceCount: 33
},
{
  id: 't-data',
  name: 'Data Governance',
  slug: 'data-governance',
  description:
  'Data protection, data sharing, consent, provenance and the stewardship arrangements that underpin AI systems.',
  colorKey: 'data',
  resourceCount: 47
},
{
  id: 't-sustainability',
  name: 'Sustainability',
  slug: 'sustainability',
  description:
  'Environmental cost of AI systems, and the use of AI for climate adaptation, agriculture and resource management.',
  colorKey: 'sustainability',
  resourceCount: 22
},
{
  id: 't-ecosystem',
  name: 'AI Ecosystem',
  slug: 'ai-ecosystem',
  description:
  'Mapping of the actors, funding flows, compute, talent pipelines and institutions that make up national AI ecosystems.',
  colorKey: 'ecosystem',
  resourceCount: 29
}];


export const topicBySlug = (slug: string): Topic | undefined => topics.find((t) => t.slug === slug);
export const topicByName = (name: string): Topic | undefined => topics.find((t) => t.name === name);
export const topicNames = topics.map((t) => t.name);

export const sectors = [
'Agriculture',
'Education',
'Financial Services',
'Health',
'Public Sector',
'Transport & Mobility',
'Climate & Environment',
'Labour & Employment',
'Justice & Rights'];


export const responsibleAiDimensions = [
'Transparency',
'Accountability',
'Fairness & Non-discrimination',
'Privacy & Data Protection',
'Human Oversight',
'Safety & Robustness',
'Participation',
'Environmental Responsibility'];


export const ecosystemCategories = [
'Policy & Regulation',
'Research & Knowledge',
'Deployment & Services',
'Skills & Capacity',
'Infrastructure & Compute',
'Funding & Investment'];


export const organizationTypes: OrganizationType[] = [
'Government',
'Private Sector',
'Civil Society / NGO',
'University / Research Institution',
'Regional Organization',
'International Organization'];


export const contentTypeGroups = [
{ label: 'Use Cases', types: ['Use Case'] },
{
  label: 'Publications',
  types: ['Report', 'Policy Brief', 'Research Brief', 'Innovation Brief', 'Mapping Study', 'Commentary']
},
{ label: 'Datasets', types: ['Dataset'] },
{ label: 'People', types: ['Person'] },
{ label: 'Organizations', types: ['Organization'] },
{ label: 'Learning Resources', types: ['Learning Resource'] },
{ label: 'Events', types: ['Event'] }];


export const years = [2026, 2025, 2024, 2023, 2022];