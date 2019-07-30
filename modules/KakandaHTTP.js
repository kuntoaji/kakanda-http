'use strict';

import HTTP_STATUSES from './HTTP_STATUSES.js';

export default class KakandaHTTP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchText: ''};
  }

  handleChange(e) {
    this.setState({searchText: e.target.value});
  }

  httpStatuses() {
    let searchString = this.state.searchText.trim().toLowerCase();
    let result = HTTP_STATUSES;

    if(searchString.length > 0){
      result = result.filter(function(httpStatus){
        return httpStatus.status_code.match(searchString) || httpStatus.reason_phrase.toLowerCase().match(searchString);
      });
    }

    return result;
  }

  render() {
    return (
      <div className="kakanda-http">
        <input type="text" value={this.state.searchText} onChange={this.handleChange.bind(this)} placeholder="Search HTTP status code or status message" className="kakanda-http__search"></input>
        <ul className="kakanda-http__result">
          { this.httpStatuses().map((httpStatus) => {
              return <li key={httpStatus.status_code} className="kakanda-http__result__item">
                <aside className="kakanda-http__result__item__status-code">
                  <span>
                    {httpStatus.status_code}
                  </span>
                </aside>
                <article className="kakanda-http__result__item__explanation">
                  <h1>{httpStatus.reason_phrase}</h1>
                  <p>{httpStatus.one_liner}</p>
                  <a href={httpStatus.defined_in}>{httpStatus.defined_in}</a>
                </article>
              </li>
            })
          }
        </ul>
      </div>
    );
  }
}
