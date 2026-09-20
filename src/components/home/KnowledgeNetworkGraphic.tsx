import React from 'react';

const NODES = [
{ id: 'research', label: 'Research', x: 50, y: 14, r: 10 },
{ id: 'countries', label: 'Countries', x: 14, y: 42, r: 10 },
{ id: 'usecases', label: 'Use Cases', x: 86, y: 42, r: 10 },
{ id: 'people', label: 'People', x: 26, y: 80, r: 8 },
{ id: 'orgs', label: 'Organizations', x: 74, y: 80, r: 12 },
{ id: 'data', label: 'Datasets', x: 50, y: 56, r: 10 }];


const EDGES: [string, string][] = [
['research', 'countries'],
['research', 'usecases'],
['research', 'data'],
['countries', 'data'],
['countries', 'people'],
['usecases', 'orgs'],
['usecases', 'data'],
['people', 'orgs'],
['data', 'orgs'],
['data', 'people']];


function node(id: string) {
  return NODES.find((n) => n.id === id)!;
}

/**
 * Abstract knowledge-network graphic for the hero. Deliberately schematic:
 * it states the product idea (everything is connected) rather than decorating.
 */
export function KnowledgeNetworkGraphic() {
  return (
    <figure className="relative">
      <svg
        viewBox="0 0 100 100"
        role="img"
        aria-labelledby="network-title network-desc"
        className="h-auto w-full">
        
        <title id="network-title">The Observatory knowledge network</title>
        <desc id="network-desc">
          A diagram showing six linked record types — research, countries, responsible AI use cases, people,
          organizations and datasets — each connected to the others.
        </desc>
        <g stroke="#CFC9BC" strokeWidth="0.4">
          {EDGES.map(([a, b]) => {
            const from = node(a);
            const to = node(b);
            return <line key={`${a}-${b}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} />;
          })}
        </g>
        {NODES.map((n, i) =>
        <g key={n.id}>
            <circle
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={i === 0 || i === 5 ? '#0E5265' : '#FFFFFF'}
            stroke="#0E5265"
            strokeWidth="0.5" />
          
            <text
            x={n.x}
            y={n.y + 1.4}
            textAnchor="middle"
            fontSize="3.1"
            fontWeight="600"
            fill={i === 0 || i === 5 ? '#FFFFFF' : '#14202E'}
            fontFamily="Inter, sans-serif">
            
              {n.label}
            </text>
          </g>
        )}
      </svg>
    </figure>);

}
