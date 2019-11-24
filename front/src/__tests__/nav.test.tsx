import React from 'react'
import Nav from "pages/Nav";
import { render, fireEvent, waitForElement } from '@testing-library/react'
import axiosMock from 'axios'
import { act } from 'react-dom/test-utils';
import ReactDOM from'react-dom'

interface IGender {
    id: number
    name: string
}


describe('test nav ', () => {

    let container:Element|null ;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container as Element);
        container = null;
    });
    it('can render and update a nav', () => {
        act(() => {
            ReactDOM.render(<Nav />, container);
        });
        const navGenderLinkNodes = (container as Element).querySelectorAll('.navGenderLink');
        console.log(navGenderLinkNodes.length)
        expect(navGenderLinkNodes).toBeTruthy();
    });
    it('test login button', () => {
        act(() => {
            ReactDOM.render(<Nav />, container);
        });
        const loginBtn = (container as Element).querySelector('.loginBtn');
    });
})