import React from 'react';
import { connect } from 'react-redux';
import Instance from '../Instance';

function Home({instances, workflows}) {
    return (
        <div className="container home">
          { instances.map(instance => <Instance key={instance.workflow_id + '_' + instance.workflow_instance_key} workflow={workflows[instance.workflow_id]} instance={instance}/>)}
        </div>
    )
}

export default connect(state => state)(Home)

