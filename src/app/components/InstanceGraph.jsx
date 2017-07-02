import React from 'react';
import Graph from 'react-graph-vis';

const options = {
    layout: {
        hierarchical: {
            enabled: true,
            direction: 'LR',
            sortMethod: 'directed',
            levelSeparation: 250
        }
    },
    autoResize: true,
    nodes: {
        shape: 'box'
    },
    edges: {
        color: "#000000"
    },
    physics: {
        enabled: false
    }
};

const colors = {
    start: '#5DADE2',
    retry: '#5DADE2',
    failure: '#FF0000',
    success: '#2ECC71'
}

export default function InstanceGraph({workflow, instance, onNodeSelect=null}) {
    const nodes = []
    const edges = []

    function process(step) {
        const node = {
            id: step.name,
            label: step.name,
            color: '#FFFFFF'
        }

        const instance_step = instance.steps[step.name];
        if (instance_step && instance_step.events.length) {
            const last_event = instance_step.events[0]
            node.color = colors[last_event.name]
        }

        nodes.push(node);
        (step.children || []).forEach(child => {
            edges.push({from: step.name, to: child.name})
            process(child)
        })
    }

    process(workflow.initial_step)

    const events = {
        select: ({ nodes, edges }) => {
           if (onNodeSelect) onNodeSelect(nodes.length ? nodes[0] : null)
        }
    }

    return <Graph style={ {width: '100%' }} graph={ { nodes, edges } } options={options} events={events}/>
}