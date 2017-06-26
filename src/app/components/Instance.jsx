import React from 'react';
import Graph from 'react-graph-vis';

const options = {
    layout: {
        hierarchical: true
    },
    edges: {
        color: "#000000"
    }
};

const colors = {
    start: '#5DADE2',
    retry: '#5DADE2',
    failure: '#FF0000',
    success: '#2ECC71'
}

export default function Instance(props) {
    const {workflow, instance} = props
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
            process(child);
            edges.push({from: step.name, to: child.name})
        })
    }

    process(workflow.initial_step)

    console.log(nodes)

    return (
        <div className="workflow-instance">
            <span className="label">{`${workflow.workflow_id}:${instance.workflow_instance_key}`}</span>
            <Graph graph={ { nodes, edges } } options={options}/>
        </div>
    )
}