const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			favorites: [],
			hola: "Game of Thrones APP"
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			saludarALuis: () => {
				console.log("Hola Luisito!")
			},

			addFavorite: (personaje) => {

				const store = getStore()

				if(!store.favorites.includes(personaje)){
					setStore({ favorites: [ ...store.favorites, personaje] })
				}

			},
			removeFavorite: (personaje) => {

				const store = getStore()

				setStore({ favorites: store.favorites.filter( itm => itm.id !== personaje.id ) })

			}

		}
	};
};

export default getState;
