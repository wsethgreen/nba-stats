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

    
    displayData = (e) => {
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
                            <td>SEASON</td>
                            <td>GAMES</td>
                            <td>MIN</td>
                            <td>FG%</td>
                            <td>FG3%</td>
                            <td>FT%</td>
                            <td>REB</td>
                            <td>AST</td>
                            <td>BLK</td>
                            <td>STL</td>
                            <td>TO</td>
                            <td>FOULS</td>
                        </tr>
                        <tr>
                            <td>{value['season']}</td>
                            <td>{value['games_played']}</td>
                            <td>{value['min']}</td>
                            <td>{value['fg_pct']}</td>
                            <td>{value['fg3_pct']}</td>
                            <td>{value['ft_pct']}</td>
                            <td>{value['reb']}</td>
                            <td>{value['ast']}</td>
                            <td>{value['blk']}</td>
                            <td>{value['stl']}</td>
                            <td>{value['turnover']}</td>
                            <td>{value['pf']}</td>
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
                <form onSubmit={this.formSubmit}>
                    <label htmlFor="name" className="name_label">Name</label>
                    <input type="text" className="name_input" id="name" />
                    <label htmlFor="year" className="year_label">Year</label>
                    <input type="text" className="year_input" id="year" />
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
