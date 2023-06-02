plantsCtrl = {};



plantsCtrl.getAllCategories = async (req, res) => {


    const url = 'https://house-plants2.p.rapidapi.com/all-lite';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f2903ab274msh37b9574ccf0b822p17fe37jsn43f050142aae',
            'X-RapidAPI-Host': 'house-plants2.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        const resultado = result
            .filter(objeto => objeto.Origin && objeto.Origin.includes("Ecuador"))
            .map(objeto => objeto.id);





        const url2 = `https://house-plants2.p.rapidapi.com/id/${resultado[0]}`;
        const options2 = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'f2903ab274msh37b9574ccf0b822p17fe37jsn43f050142aae',
                'X-RapidAPI-Host': 'house-plants2.p.rapidapi.com'
            }
        };


        const response2 = await fetch(url2, options2);
        const result2 = await response2.json();
        console.log(result2);


        return res.status(200).json(result2)
    } catch (error) {
        console.error(error);
    }
}

module.exports = plantsCtrl;