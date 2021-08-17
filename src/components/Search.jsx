import React, { Component } from "react";
import axios from "axios";

class Search extends Component {

    formSubmit = (e) => {
        e.preventDefault();
        const search_input = document.getElementById("search").value;
        console.log(search_input)
        axios.post("/getname", {
            last_name: search_input
        }).then(res => {
            console.log(res.data)
        });
    }

    render () {
        return (
            <div>
                <form onSubmit={this.formSubmit}>
                    <label htmlFor="search" className="search_label">Search</label>
                    <input type="text" className="search_input" id="search" />
                    <button className="search_btn">Search</button>
                </form>
            </div>
        )
    }

}

export default Search
