// Do we make with JS or PYTHON? We need to make the posts and comments accessible to the database without putting it there.

import http from 'http';
import express from 'express';
import mysql from 'mysql';
import path from 'path';

var app = express();
var socket = 3000;

