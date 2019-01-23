/**
 * Copyright (c) 2012-present Houfeng
 * @homepage https://github.com/Houfeng/mota
 * @author Houfeng <admin@xhou.net>
 */

const owner = { component: null, intercepted: false, binding: false };

owner.owner = owner;
module.exports = owner;