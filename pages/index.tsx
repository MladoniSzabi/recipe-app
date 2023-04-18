import * as React from 'react'

export default function IndexPage() {
    return <main>
        {Array.from(new Array(10)).map(() => (<div className="row">
            <img src="/img.png" alt="image go brrr" />
            <p className="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <div className="buttons">
                <button>Button 1</button>
                <button>Button 2</button>
            </div>
        </div>))}
    </main>
}
