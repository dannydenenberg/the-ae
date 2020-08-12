/** Here are the parameters all resolvers can take:
 * (parent, args, context, info)
 */
const resolvers = {
  Query: {
    hello: (parent, args, { req, res }, info) => {
      console.log("HERE ARE 🍪:", JSON.stringify(req.cookies));
      res.cookie("SHOULDN't bee HER", "den2", { httpOnly: true });
      return `hey george washington, it's ${new Date()}`;
    },
  },
  Mutation: {
    do: (parent, args, context, info) => {
      context.res.cookie("in mutation", `${new Date().getSeconds()}`, {
        httpOnly: true,
      });

      return "did it bud";
    },
  },
};

export default resolvers;
