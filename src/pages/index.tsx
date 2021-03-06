import { GetServerSideProps } from "next";
import Head from "next/head";
import Meta from "../components/meta/meta";

export default function Home({ isLoggedIn }: { isLoggedIn: boolean }) {
    return (
        <div>
            <Meta isLightTheme={false} />
            <Head>
                <title>diskord</title>
            </Head>
            <div>
                <main>
                    <h1>Diskord</h1>
                    <p>a simple discord clone</p>
                    <section>
                        <a href={isLoggedIn ? `/app` : `/login`} className="diskord">
                            {isLoggedIn ? "Open" : "Log In"}
                        </a>
                        <a href="https://discord.gg/WaEqT29vQb" target="_blank" rel="nofollow" className="discord">
                            Discord
                        </a>
                        <a href="https://github.com/cursorsdottsx/diskord" target="_blank" rel="nofollow" className="github">
                            GitHub
                        </a>
                    </section>
                </main>
            </div>
            <style jsx>{`
                div {
                    min-height: 100vh;
                    background-color: var(--clr-dark-grey);
                    display: grid;
                    place-items: center;
                    text-align: center;
                }

                main {
                    transform: scale(0.8);
                }

                h1 {
                    text-transform: uppercase;
                    transform: scale(2.5);
                    font-weight: 700;
                    font-size: 2.5rem;
                }

                p {
                    margin-top: 1.25rem;
                    font-size: 1rem;
                    font-weight: 100;
                }

                section {
                    margin: 1rem 0;
                    display: flex;
                    justify-content: space-between;
                }

                section a {
                    margin: 0 1rem;
                    padding: 0.5rem 1rem;
                    display: block;
                    font-size: 1rem;
                    transition: 0.2s transform ease;
                }

                section a:hover {
                    transform: scale(1.1);
                    text-decoration: none;
                }

                .diskord {
                    background-color: var(--clr-discord);
                    color: var(--clr-light);
                    border-radius: 4px;
                }

                .discord {
                    background-color: var(--clr-dark);
                    color: var(--clr-blue);
                    border-radius: 4px;
                }

                .github {
                    background-color: var(--clr-light);
                    color: var(--clr-dark);
                    border-radius: 4px;
                }

                @media (min-width: 640px) {
                    main {
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {
            //@ts-ignore
            isLoggedIn: !!ctx.req.user,
        },
    };
};
