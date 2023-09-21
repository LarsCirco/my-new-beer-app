import axios from 'axios';
//Mangler Styling, ish ferdig med forside!
//printer info, men skal putte mer info når de trykker inn på en!
export default function BeerDetail({ beer }) {
    return (
        <div className="p-4">
            <img src={beer.image_url} alt={beer.name} className="w-32 mx-auto mb-4" />
            <h1 className="text-xl font-bold mb-2">{beer.name}</h1>
            <p>ABV: {beer.abv}</p>
            <p>{beer.description}</p>
        </div>
    );
}
// setter paths for alle linkene
export async function getStaticPaths() {
    const response = await axios.get('https://api.punkapi.com/v2/beers');
    const beers = response.data;
    const paths = beers.map(beer => ({ params: { id: beer.id.toString() } }));

    return { paths, fallback: false }; 
}

// fetcher all info for en spesifikk ø
export async function getStaticProps({ params }) {
    const response = await axios.get(`https://api.punkapi.com/v2/beers/${params.id}`);
    const beer = response.data[0]; 

    return { props: { beer } };
}
