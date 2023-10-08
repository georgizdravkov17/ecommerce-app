import { BASE_API_URL } from './variables.js';

export const addRedirectEvent = (element, path) => {
    element.addEventListener('click', () => {
        window.location.replace(`${path}.html`);
    })
} 

export const redirect = (path) => {

    const route = path === '/' ? '/' : `${path}.html`;
    
    window.location.replace(route);

}

export const logout = () => {
    localStorage.removeItem('auth-user');

    redirect('/');
}


export const guid = () => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export const getAuthUser = () => {
    return JSON.parse(localStorage.getItem('auth-user'));
}

export const updateLocalStorageCollection = (collectionName, newItem) => {
    const collection = JSON.parse(localStorage.getItem(collectionName));

    const updatedCollection = [...collection, item];

    localStorage.setItem(collectionName, JSON.stringify(updateLocalStorageCollection));
}

export const printProducts = (products, container, template) => {

    const USERS_API = `${BASE_API_URL}/users`;

   return products.map(({id, img, name, price, category}) => {

        const templateClone = template.content.cloneNode(true);

        const productCard = templateClone.querySelector('.product-card');

        productCard.querySelector('.product-card__img').setAttribute('src', img);
        productCard.querySelector('.product-card__img').setAttribute('alt', name);

        productCard.querySelector('.product-card__name').textContent = name;

        productCard.querySelector('.product-card__price').textContent = `$${price}`;

        productCard.querySelector('.product-card__category').textContent = `Category: ${category}`;

        productCard.querySelector('.product-card__buy-button').addEventListener('click', () => {
            const authUser = getAuthUser();

            if(!authUser){
                redirect('/login');
            }

           authUser.cartProducts.push({
            id,
            img,
            name,
            price,
            category
        });

        localStorage.setItem('auth-user', JSON.stringify(authUser));

        fetch(`${USERS_API}/${authUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(authUser)
        })
        .then(_ => {
            alert('Successfuly added to the cart!');
        })
        .catch(err => {
            console.log(err);
        })

        });
        
        productCard.querySelector('.product-card__favorites-button').addEventListener('click', () => {

            const authUser = getAuthUser();

            if(!authUser){
                redirect('/login');
            }

           authUser.favoritesProducts.push({
            id,
            img,
            name,
            price,
            category
        });

        localStorage.setItem('auth-user', JSON.stringify(authUser));

        fetch(`${USERS_API}/${authUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(authUser)
        })
        .then(_ => {
            alert('Successfuly added to favorite products!');
        })
        .catch(err => {
            console.log(err);
        });
        

        });

        productCard.querySelector('.product-card__save-button').addEventListener('click', () => {

            const authUser = getAuthUser();

            if(!authUser){
                redirect('/login');
            }

           authUser.savedProducts.push({
            id,
            img,
            name,
            price,
            category
        });

        localStorage.setItem('auth-user', JSON.stringify(authUser));

        fetch(`${USERS_API}/${authUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(authUser)
        })
        .then(_ => {
            alert('Saved product!');
        })
        .catch(err => {
            console.log(err);
        })

        });

        container.append(productCard);


        return {
            product: {
                id,
                img,
                name,
                price,
                category
            },
            element: productCard
        }
      })

}

