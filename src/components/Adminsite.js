import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

export default class Adminsite extends Component {
    constructor(props){
        super(props)
        const token =  localStorage.getItem("token")

        let loggedIn = true
        //Magic authenticate Token =))
        if(token!="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTkyNDgwMDE0fQ.PnimktEu9sHSpyLUCwBTHH4kgfbNcpDxu4Z0oq-BeX0"){
            loggedIn = false
        }

        this.state = {
            loggedIn
        }
    }
    render() {
        if(this.state.loggedIn===false){
            return <Redirect to = "/"/>
        }
        return (
            <div>
                <h1>This is admin app</h1>
            </div>
        )
    }
}
