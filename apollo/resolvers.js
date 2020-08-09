import User from './../models/user.model'
import startDatabase from './../utils/startDatabase'

const person = { id: 1, name: 'George', status: 'cached' }

/** Start the Database **/
startDatabase()

/** Resolve Function Parameters:
 * (_parent, _args, _context, _info) */
export const resolvers = {
  Query: {
    async people (_parent, _args, _context, _info) {
      const docs = await User.find({})

      console.log('DOCS:')
      console.log(docs)

      return docs
      // return [person, { id: 2, name: 'Washer', status: 'fit' }]
    }

  },
  Mutation: {
    async make (_, args) {
      const newPerson = new User(args)
      const doc = await newPerson.save()
      return doc
      // return person
    }
  }
}
