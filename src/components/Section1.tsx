import React, { useCallback, useState, ChangeEvent } from 'react';

type Props = {
  sql: string,
  handleSqlChange: (event: ChangeEvent<HTMLTextAreaElement>) => void,
  handleTransformChange: () => void,
}

function Section1({
  sql,
  handleSqlChange,
  handleTransformChange
}: Props) {
  const [selectedStatement, setSelectedStatement] = useState('SELECT');
  const [selectedTable, setSelectedTable] = useState('');
  const [whereClause, setWhereClause] = useState('');

  const handleSqlTypeChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const sqlType = event.target.value;
    let initialSql = '';

    if (selectedTable) {
      switch (sqlType) {
        case 'SELECT':
          initialSql = `SELECT * FROM ${selectedTable} ${whereClause ? `WHERE ${whereClause}` : ''}`;
          break;
        case 'INSERT':
          initialSql = `INSERT INTO ${selectedTable} (column1, column2) VALUES (value1, value2)`;
          break;
        case 'UPDATE':
          initialSql = `UPDATE ${selectedTable} SET column1 = value1 ${whereClause ? `WHERE ${whereClause}` : ''}`;
          break;
        case 'DELETE':
          initialSql = `DELETE FROM ${selectedTable} ${whereClause ? `WHERE ${whereClause}` : ''}`;
          break;
        default:
          break;
      }
    }

    console.log(`initialSql: ${initialSql}`)
    setSelectedStatement(sqlType);
    handleSqlChange({ target: { value: initialSql } } as React.ChangeEvent<HTMLTextAreaElement>);
}, [selectedTable, whereClause, handleSqlChange]);

  const handleTableChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    const table = event.target.value;
    setSelectedTable(table);
  }, []);

  const handleWhereClauseChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const whereClause = event.target.value;
    setWhereClause(whereClause);
  }

  return (
    <section className="section-1">
      <h2>SQL</h2>
      <div className="input-area">
        <select value={selectedStatement} onChange={handleSqlTypeChange}>
          <option value="SELECT">SELECT</option>
          <option value="INSERT">INSERT</option>
          <option value="UPDATE">UPDATE</option>
          <option value="DELETE">DELETE</option>
        </select>
        {selectedStatement === 'INSERT' ? (
          <span>INTO</span>
        ) : (
          <span>{selectedStatement === 'UPDATE' ? '' : 'FROM'}</span>
        )}
        <input
          type="text"
          placeholder="my_table"
          value={selectedTable}
          onInput={handleTableChange as () => void}
        />
        {selectedStatement !== 'INSERT' && (
          <>
            <span>WHERE</span>
            <input
              type="text"
              placeholder='column1 = "value1"'
              value={whereClause}
              onInput={handleWhereClauseChange as () => void}
            />
          </>
        )}
      </div>
      {selectedTable && (
        <div className="display-area">
          <span className='clause-container'>
            <span className='clause'>{selectedStatement}</span>
            {selectedStatement === 'SELECT' && (
              <span className='clause'>*</span>
            )}
            {selectedStatement === 'INSERT' ? (
              <span className='clause'>INTO</span>
            ) : (
              (selectedStatement !== 'UPDATE' && (
                <span className='clause'>FROM</span>
              ))
            )}
            <span className='clause'>{selectedTable}</span>
            {(selectedStatement !== 'INSERT' && whereClause) && (
              <>
                <span className='clause'>WHERE</span>
                <span className='clause'>{whereClause}</span>
              </>
            )}
          </span>
        </div>
      )}
      <textarea
        className="hoge"
        value={sql}
        onChange={handleSqlChange}
      />
      <div className="button-area">
        <button onClick={handleTransformChange}>Transform SQL</button>
      </div>
    </section>
  );
}

export default Section1;
