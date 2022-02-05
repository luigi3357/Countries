if (paises.length) {
    try {
       paises = paises.map((idPais) => getCountryById(idPais));
       paises = await Promise.all(paises);

       const errors = [];

       paises.forEach(async (response) => {
          if (response.error) return errors.push(response.error);

          await activityCreated.addCountry(response.country);
       })

       const country = await Country.findByPk(id.toUpperCase());
      