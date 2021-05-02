import React from "react";

//You could pass the Repo Component the just the values of props.repo to get rid of 'props.repo.blank' and then you would just have
//props.name and you could even break this down even more to get rid of the props prefix'
const Repo = props => (
  <tr>
  <td><a href={props.repo.homepage || props.repo.html_url} rel="noreferrer" target="_blank">{props.repo.name}</a></td>
  <td>{props.repo.description}</td>
  <td>{props.repo.forks_count}</td>
  <td><button onClick={ () => props.showCommit(props.repo.name)}>View Commits</button></td>
  </tr>
)


class RepoList extends React.Component {
// same style things with the this.props lol
  render() {
    return (
      <table>
      
        {/* you could consider using template literals here just to show off some es6 knowledge
         this line is perfectly fine without it though */
        this.props.orgName ? <caption>Search Results for {this.props.orgName}</caption> : null
        }
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Fork Count</th>
            <th>Commit Link</th>
          </tr>
        </thead>
        <tbody>
          {this.props.repos.map(repo => (
            //you can shorthand 'repo={repo}' to just 'repo' since the prop and value have the same name
              <Repo showCommit={this.showCommit} repo={repo} key={repo.name} />
          ))}
        </tbody>
      </table>
    )
  }

  showCommit = commit => {
    this.props.hideRepos();
    this.props.updateSelectedRepo(commit);
    console.log(commit);
  };
}

export default RepoList;
