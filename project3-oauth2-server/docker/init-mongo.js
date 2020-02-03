db.createUser(
    {
        user: 'omaryahir',
        pwd: '123',
        roles: [
            {
                role: 'readWrite',
                db: 'mymongodb'
            }
        ]
    }
)
