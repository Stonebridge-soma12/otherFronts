import React from 'react';
import Card from '../card/card';
import style from './cardGrid.module.css';

class CardGrid extends React.PureComponent {
    render() {
        const {projects} = this.props;
        console.log(projects);
        return (
            <div className={`${style.grid}`}>
                {
                    {projects}.projects.map(project =>
                        <Card title={project.name} description={project.description} lastUpdate={project.lastModify} />
                    )
                }

            </div>
        )
    }
}

export default CardGrid;