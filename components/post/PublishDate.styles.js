import css from 'styled-jsx/css';

export default css.global`
  @import 'variables.scss';

  .date {
    color: $color-gray-darkest;
    font-size: 1.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.075em;

    &:after {
      content: "\2014";
      margin-left: 1.5rem;
      color: inherit;
    }
  }

  @media (min-width: $break-tablet) {
    .date {
      margin-bottom: 2.5rem;
      color: $color-purple;
      text-align: right;

      &:after {
        content: none;
      }
    }
  }
`;
