import React, { Component } from "react";
import axios from "axios";

class Search extends Component {

    state = {
        data: [],
        isLoading: true,
    }

    // Function to perform get request to backend based on user inputs
    formSubmit = (e) => {

        e.preventDefault();
        const name_input = document.getElementById("name").value;
        const year_input = document.getElementById("year").value;

        console.log(name_input, year_input)

        axios.get(`http://localhost:5000/search/${name_input}/${year_input}`).then(res => {
            this.setState({data: res.data})
            console.log(this.state.data)
        });
        // Set isLoading to be false. This will trigger displayData function.
        this.setState({isLoading: false})
    }

    
    displayData = () => {
        // If no api call has been made yet, render text advising user to search for player
        if (this.state.isLoading) {
            let empty_header = React.createElement("h1", {className: "empty_header"}, "Search for a player and year to see their average stats that year.")
            return empty_header
            // ReactDOM.render(empty_header, document.getElementById("results_container"));
        } 
        
        else {

            // Array to hold headers (which will be players' names)
            let headers = [];
            // Array to hold tables which will display players' season averages
            let tables = [];
            // Array to hold headers and tables in order. Components will be looped 
            // through to display each player's name and stats
            let components = [];

            // Loop through api call to collect players name and stats.
            // Create html to be displayed for each player.
            for (const [key, value] of Object.entries(this.state.data)) {

                let header = React.createElement("h1", {className: "player_header"}, key);

                let table = (
                    <div className="player_table">
                        <tr>
                            <td className='column_header'>SEASON</td>
                            <td className='column_header'>GAMES</td>
                            <td className='column_header'>MIN</td>
                            <td className='column_header'>FG%</td>
                            <td className='column_header'>FG3%</td>
                            <td className='column_header'>FT%</td>
                            <td className='column_header'>PTS</td>
                            <td className='column_header'>REB</td>
                            <td className='column_header'>AST</td>
                            <td className='column_header'>BLK</td>
                            <td className='column_header'>STL</td>
                            <td className='column_header'>TO</td>
                            <td className='column_header'>FOULS</td>
                        </tr>
                        <tr>
                            <td className='column_data'>{value['season']}</td>
                            <td className='column_data'>{value['games_played']}</td>
                            <td className='column_data'>{value['min']}</td>
                            <td className='column_data'>{value['fg_pct']}</td>
                            <td className='column_data'>{value['fg3_pct']}</td>
                            <td className='column_data'>{value['ft_pct']}</td>
                            <td className='column_data'>{value['pts']}</td>
                            <td className='column_data'>{value['reb']}</td>
                            <td className='column_data'>{value['ast']}</td>
                            <td className='column_data'>{value['blk']}</td>
                            <td className='column_data'>{value['stl']}</td>
                            <td className='column_data'>{value['turnover']}</td>
                            <td className='column_data'>{value['pf']}</td>
                        </tr>
                    </div>

                )

                headers.push(header)
                tables.push(table)
            }
            
            for (let i = 0; i < headers.length; i++) {
                components.push(headers[i]);
                components.push(tables[i]);
            }

            const element = (
                <div>
                    {components}
                </div>
            )

            // loop through the api call and add all results to the data array.
            return element

        }
    }

    render () {
        return (
            <div>
                <form className='search_form' onSubmit={this.formSubmit}>
                    <div className="input_container">
                        <div className="name_container">
                            <label htmlFor="name" className="name_label">Name</label>
                            <input type="text" className="name_input" id="name" />
                        </div>
                        <div className="year_container">
                            <label htmlFor="year" className="year_label">Year</label>
                            <input type="text" className="year_input" id="year" />
                        </div>
                    </div>
                    <button className="search_btn">Search</button>
                </form>
                
                <div id="results_container">

                </div>
                {this.displayData()}
            </div>
        )
    }

}

export default Search
