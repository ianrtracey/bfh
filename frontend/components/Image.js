// import * as React from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// export class Img extends React.Component {
//   state = {
//     loading: true,
//     error: false,
//   };

//   componentWillMount() {
//     this.img = new Image();
//     this.img.onload = () => {
//       this.setState({
//         loading: false,
//         error: false,
//       });
//     };
//     this.img.src = this.props.src;
//   }

//   render() {
//     if (this.state.loading) {
//       return (
//         <ReactCSSTransitionGroup
//           transitionName="loadingItem"
//           transitionAppear={true}
//           transitionAppearTimeout={500}
//           transitionEnterTimeout={500}
//           transitionLeaveTimeout={300}
//         >
//           <img src={img} />
//         </ReactCSSTransitionGroup>
//       );
//     }
//   }
// }
