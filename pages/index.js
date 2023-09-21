import axios from 'axios';
import Link from 'next/link';

export default function Beers({ beers = [] }) {
    return (
        <div className="p-10 bg-gradient-to-r from-slate-900 to-slate-700">
            <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-40">
                {beers.map(beer => (
                    <div key={beer.id} className="bg-sky-100 opacity-97 shadow-md rounded w-30 h-30 hover:bg-fuchsia-50">
                        <Link href={`/beer/${beer.id}`}>
                            <> 
                            <div className=" p-4 flex flex-col justify-between">
                                <div className="flex flex-col items-center">
                                    <img src={beer.image_url} alt={beer.name} className="w-full h-20 object-contain" />
                                    <h2 className="mt-2 text-xl text-gray-600 font-semibold text-center">{beer.name}</h2>
                                    <p className="text-center text-gray-600">ABV: {beer.abv}</p>
                                    <p className="text-center text-gray-600">{beer.description}</p>
                                </div>
                            </div>
                            </>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}




export async function getStaticProps() {
    try {
        const response = await axios.get('https://api.punkapi.com/v2/beers');
        return {
            props: { beers: response.data }
        };
    } catch (error) {
        console.error("404??? Fikk ikke fetcha:", error);
        return {
            props: { beers: [] }
        };
    }
}
