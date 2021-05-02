import React from "react";

class CommitList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }
/* consider using hooks in order to achieve this https://reactjs.org/docs/hooks-effect.html
  lifestyle methods like componenetDidMount are being phased out*/
    componentDidMount() {
      /* you could consider pulling just the orgName and commit from the props like 
        '{orgName,commit } = this.props' just a style thing
      */
      const url = `https://api.github.com/repos/${this.props.orgName}/${this.props.commit}/commits`;

      fetch(url).then((result) => result.json())
        .then((result) => {
          result = result.map(x => {
              return {sha: x.sha, author: x.commit.author.name, message: x.commit.message}
            });
          // your probably already planned to take this console.log out but just a reminder
          console.log(result);
          this.setState(prevState => ({
            data: [...prevState.data, ...result] 
          }))
        })
      .catch(function (error) {
          /* same for this down here but since this is just a assigment this may be sufficent error handling and you 
           may want to keep this console log.*/
        console.log(error);
      });
    }

    render() {
      const {data} = this.state

      // Doesnt look like your using the index here anymore so you could remove it.
      const result = data.map((entry, index) => {
        return <tr key={entry.sha}><th>{entry.sha}</th><th>{entry.author}</th><th>{entry.message}</th></tr>
      })

    return <table><thead><tr><th>Sha</th><th>Author</th><th>Message</th></tr></thead><tbody>{result}</tbody></table>
    }
}

/*
Consider adding prop validations. This are normally required for 
production code

https://www.tutorialspoint.com/reactjs/reactjs_props_validation.htm

*/
export default CommitList;
