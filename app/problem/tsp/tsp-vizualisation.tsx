'use client'

import { useState, useEffect } from 'react'
import ReactFlow, {
  type Node,
  type Edge,
  Background,
  Controls,
  MarkerType,
  useNodesState,
  useEdgesState,
  Panel,
  EdgeMarker,
} from 'reactflow'

import '@xyflow/react/dist/style.css'
import { Button } from '@/components/ui/button'

interface TSPVisualizationProps {
  distances: number[][] // Matrice de distances
  optimalPath: number[] // Chemin optimal (ordre des villes)
  optimalScore: number // Score total du chemin
  title?: string
}

export const TSPVisualization = ({
  distances,
  optimalPath,
  optimalScore,
  title = 'Résultat(s)',
}: TSPVisualizationProps) => {
  const [showAllEdges, setShowAllEdges] = useState(false)
  // Spécifier explicitement les types pour les hooks
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([])

  // Génère les positions des villes en cercle
  const generateCircularLayout = (numNodes: number, radius = 200): Node[] => {
    const nodes: Node[] = []
    const centerX = radius + 50
    const centerY = radius + 50

    for (let i = 0; i < numNodes; i++) {
      const angle = (i * 2 * Math.PI) / numNodes
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)

      nodes.push({
        id: i.toString(),
        position: { x, y },
        data: { label: `Ville ${i + 1}` },
        type: 'default',
        style: {
          background: '#f5f5f5',
          border: '1px solid #222',
          borderRadius: '50%',
          width: 60,
          height: 60,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '16px',
          fontWeight: 'bold',
        },
      })
    }

    return nodes
  }

  // Crée toutes les arêtes entre villes (non dirigées)
  const createAllEdges = (): Edge[] => {
    const edges: Edge[] = []

    for (let i = 0; i < distances.length; i++) {
      for (let j = 0; j < distances[i].length; j++) {
        if (i !== j) {
          edges.push({
            id: `e${i}-${j}`,
            source: i.toString(),
            target: j.toString(),
            label: distances[i][j].toString(),
            type: 'default',
            animated: true,
          })
        }
      }
    }

    return edges
  }

  // Crée les arêtes du chemin optimal (avec flèches)
  const createOptimalPathEdges = (): Edge[] => {
    const edges: Edge[] = []

    for (let i = 0; i < optimalPath.length - 1; i++) {
      const source = optimalPath[i]
      const target = optimalPath[i + 1]

      edges.push({
        id: `e${source}-${target}`,
        source: source.toString(),
        target: target.toString(),
        label: distances[source][target].toString(),
        type: 'straight',
        animated: true,
        style: { stroke: '#ff0072', strokeWidth: 2 },
        labelStyle: { fill: '#000', fontWeight: 'bold', fontSize: 14 },
        markerEnd: {
          type: MarkerType.Arrow,
          color: '#ff0072',
        } satisfies EdgeMarker,
      })
    }

    return edges
  }

  useEffect(() => {
    if (distances.length > 0) {
      const numCities = distances.length
      const initialNodes = generateCircularLayout(numCities)
      setNodes(initialNodes)
      setEdges(showAllEdges ? createAllEdges() : createOptimalPathEdges())
    }
  }, [distances, optimalPath, showAllEdges, setNodes, setEdges])

  const toggleEdges = () => {
    setShowAllEdges((prev) => !prev)
  }

  return (
    <div className="w-full h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        attributionPosition="bottom-left"
      >
        <Controls />
        <Background gap={12} size={1} />

        <Panel position="top-right" className="bg-card p-4 rounded-md shadow-md">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">{title}</h3>
            <div>
              <p className="font-medium text-sm text-muted-foreground">
                Chemin optimal: {optimalPath.join(' → ')}
              </p>
              <p className="font-medium text-sm text-muted-foreground">
                Score total: {optimalScore}
              </p>
            </div>
            <Button size="sm" onClick={toggleEdges}>
              {showAllEdges ? 'Afficher chemin optimal' : 'Afficher toutes les connexions'}
            </Button>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  )
}
