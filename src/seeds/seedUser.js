import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient({
    rejectOnNotFound: {
        findFirst: {
            User: (err) => new Error(`User: ${err}`),
        },
        findMany: {
            User: (err) => new Error(`Users: ${err}`),
        },
    },
    errorFormat: 'minimal',
})

for (var a = [], i = 0; i < 40; ++i) a[i] = i;

function shuffle(array) {
    let tmp, current, top = array.length;
    if (top) while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }
    return array;
}

a = shuffle(a);


const users = a.map(
    (id) => ({
        pseudo: `${id}`,
        email: `${id}@gmail.com`,
        password: "azer",
        firstname: `${id}`,
        lastname: `${id}`,
        // sex: `(Math.random()>0.5 ? 'MAN' : 'WOMAN'`,
        latitude: (Math.random() > 0.5 ?
            48.82558263128961 + (Math.random() / 100)
            :
            48.82558263128961 - (Math.random() / 100)),
        longitude: (Math.random() > 0.5 ?
            2.335827558647471 + (Math.random() / 100)
            :
            2.335827558647471 - (Math.random() / 100)),
        age: id,
        description: "J'aime les fraises",
        nationality: "France",
        // kindOfTrip: "BIKE",
        isVisibled: true
    })
)
console.log(users)

// const users = [
//     {
//         "pseudo": "Nous",
//         "email": "Bouchrajali@gmail.com",
//         "password": "azer",
//         "firstname": "Martin",
//         "lastname": "Roan",
//         "latitude": 48.82558263128961,
//         "longitude": 2.335827558647471,
//         "age": 23,
//         "description": "J'aime les fraises",
//         "nationality": "France",
//         "kindOfTrip": "Jdjdjdnd",
//         "isVisibled": true
//     }
// ]

const main = async () => {
    const response = await Promise.all(users.map((user) => prisma.user.create({
            data: user
        })
    ))
    console.log(response)
}

main()
