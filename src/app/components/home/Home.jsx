import React from 'react';
import { connect } from 'react-redux';
import Instance from '../Instance';

function Home({instances, workflows}) {
    return (
        <div className="container home">
          { instances.map(instance => {
              return <Instance key={instance.workflow + '_' + instance.instance} workflow={workflows[instance.workflow]}
                               instance={instance}/>
          })
          }
        </div>
    )
}

export default connect(state => state)(Home)

