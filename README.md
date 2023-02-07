
# Find missing cats

Kittens have been disappearing across the neighbourhood and suspected abduction. This code is to locate the co-ordinates of the missing cats, using the information pieces gathered by the Forensics team.


## Installation

Git clone the project 

```bash
git clone https://github.com/sumakommajosyula/find-missing-cats.git
```
Install the dependcies of the application with npm

```bash
 npm install
```
    
## Usage

Run the application
```javascript
npm start
```

## API Reference

#### Find missing cats

```http
  POST /api/locateMissingCats
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `emailAddress` | `string` | **Required**. Used to authenticate user uniquely |

## Running Tests

To run tests, run the following command
```javascript
npm run test
```
Get the test coverage report
```javascript
npm run test:coverage
```


## License

[MIT](https://choosealicense.com/licenses/mit/)

