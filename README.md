# Drivr
*By Rob Strasser - [Visit Driver](https://drivr-io.herokuapp.com/)*

Welcome to Drivr, a Flickr clone built for people to post car pictures.

**Table of Contents**

* [Drivr Overview](#drivr-overview)
* [Technologies Used](#technologies-used)
* [Backend Technology](#backend-technology)
* [Frontend Technology](#frontend-technology)
* [Conclusion](#conclusion)

## Drivr Overview

Drivr is a fullstack app written in Express, React, and Redux that allows car aficionados to share images of cars that they own or enjoy.

Users can access the explore page to view all images posted on the site or view their own images. They can also create albums for their images and post comments on images.

##### Drivr Splash Page
![Drivr Homepage](https://res.cloudinary.com/depdd11lz/image/upload/v1643503547/Screen_Shot_2022-01-29_at_4.32.20_PM_l975ph.png)

##### Drivr Explore Page
![Drivr Explore Page](https://res.cloudinary.com/depdd11lz/image/upload/v1643504520/Screen_Shot_2022-01-29_at_5.01.12_PM_wniqcm.png)

## Technologies Used

* Javascript
* node.js
* PostgreSQL
* Sequelize
* Express
* React
* Redux

To clone the repo locally:
1. `git clone https://github.com/robstrass/Drivr`.
2. CD into both `/frontend` and `/backend` and `npm install` in both.
3. Create a .env file using .env.example file in `/backend`.
4. Setup a database and user in PostgreSQL using the information you made in the .env file.
5. Create your database by running `npx dotenv sequelize db:create` from `/backend`.
6. Migrate your database by running `npx dotenv sequelize db:migrate`.
7. Seed your database by running `npx dotenv sequelize db:seed:all`.

To start your servers, run `npm start` from both `/frontend` and `/backend`.

### Backend Technology

* [Express](http://expressjs.com/en/api.html)
* [PostgreSQL](https://www.postgresql.org/docs/13/)
* [Sequelize](https://sequelize.org/)

### User's Images Code Snippet

```js
// All of a User's Images
router.get('/:userId(\\d+)/images', restoreUser, asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const images = await Image.findAll({
        where: {
            userId,
        },
        include: {model: Album}
    })
    res.json(images);
}));

// Get all Albums
router.get('/:userId(\\d+)/albums', asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const albums = await Album.findAll({
        where: {
            userId,
        },
        include: { model: Image }
    });
    res.json(albums);
}));

// Add Image
router.post('/:id(\\d+)/images', imageValidation, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { userId, albumId, imageUrl, content } = req.body;
    const imageErrors = validationResult(req);

    if (+id === +userId && imageErrors.isEmpty()) {
        const newImg = await Image.build({
            userId,
            albumId,
            imageUrl,
            content
        });
        await newImg.save();
        res.json(newImg);
    } else {
        let errors = imageErrors.array().map((error) => error.msg);
        res.json({ errors });
    }
}));

// Delete Image
router.delete('/:userId(\\d+)/images/:id(\\d+)', asyncHandler(async (req, res) => {
    const { userId, id } = req.params;

    const image = await Image.findByPk(id);
    console.log('image', image)
    const imageUserId = image.userId;
    if (+userId === imageUserId) {
        await image.destroy();
        res.json('Success, image deleted.');
    }
}));
```

### Frontend Technology

* [React](https://v5.reactrouter.com/web/guides/quick-start)
* [Redux](https://react-redux.js.org/)
* [Node](https://nodejs.org/docs/latest-v12.x/api/)

### Explore Page Snippet
```js
function HomePage() {
    const dispatch = useDispatch();
    const images = useSelector((state) => Object.values(state.image.all));

    useEffect(() => {
        dispatch(loadImages())
    },[dispatch]);

    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) return <Redirect to = '/' />;

    return (
        <div className='homepage-container'>
            <div className = 'homepage-headline-div'>
                <h1 className = 'homepage-headline'>
                    Explore
                </h1>
            </div>
            <div className = 'homepage-all-images'>
                {images.length > 0 ? images.map(image => (
                    <NavLink
                        className = 'homepage-nav-wrapper'
                        key = {image.id}
                        to = {`/homepage/images/${image.id}`}
                        onClick = {() => console.log('hit redirect')}
                    >
                        <img
                            src = {image.imageUrl}
                            alt = 'car'
                            className = 'homepage-images'
                        />
                        <div
                            className = 'homepage-image-content'
                        >
                            {image.content}
                        </div>
                    </NavLink>
                )) : null}
            </div>
        </div>
    )
}
```

## Conclusion
Since I have a passion for photography, Drivr was a really fun project for me. I use Flickr personally to host some of my images, creating an app that links my passion for photography and my love for cars was really fun.

In the future, I hope to spend more time adding more features, including a search feature and potentially the ability to save images from other users. 
