import { css } from 'lit-element';

export const sharedStyles = css`
    label {
        display: inline-block;
        margin-bottom: .5rem;
    }
    .form-inline {
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-flow: row wrap;
        flex-flow: row wrap;
        align-items: center;
    }
    .form-group, .form-control {
        box-sizing: border-box;
        margin-bottom: 1rem;
    }
    .form-inline .form-group {
        display: flex;
        flex: 0 0 auto;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-flow: row wrap;
        flex-flow: row wrap;
        align-items: center;
        margin-bottom: 0;
        margin-right: 15px;
    }
    .form-group:last-child {
        margin-right: 0px
    }
    .form-control {
        display: block;
        width: 100%;
        padding: .375rem .75rem;
        font-size: 1rem;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: .25rem;
        transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }
    .form-inline .form-control {
        display: inline-block;
    }
    .form-control:focus {
        color: #495057;
        background-color: #fff;
        border-color: #80bdff;
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
    }
    .form-control:disabled {
        opacity: 0.65;
    }
    .save-button {
        background-color: #4CAF50;
        border: none;
        color: white;
        padding: 12px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-family: inherit;
        font-weight: inherit;
        margin: 10px 0px;
        cursor: pointer;
    }
    .button {
        text-align: center;
        min-width: 120px;
        --rx-spacer-button-padding: 3px;
    }

    .button .icon svg{
        display: block
    }

    .button .icon{
        display: inline-block;
        vertical-align: bottom;
    }
`;
