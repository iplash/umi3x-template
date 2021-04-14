import Mock from 'mockjs';

export default {
  'GET /login': (req, res) => {
    setTimeout(() => {
      res.json(
        Mock.mock({
          code: 1,
          data: {
            token: '@id',
            head_img: '',
          },
          msg: '成功',
        }),
      );
    }, 400);
  },

  'GET /logout': (req, res) => {
    setTimeout(() => {
      res.json(
        Mock.mock({
          code: 1,
          data: {},
          msg: '成功',
        }),
      );
    }, 230);
  },
};
