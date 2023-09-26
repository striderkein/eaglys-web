import React, { useCallback, useEffect, useState, ChangeEvent } from 'react';

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
  const [initialSql, setInitialSql] = useState('');
  const [selectedStatement, setSelectedStatement] = useState('SELECT');
  const [selectedColumn, setSelectedColumn] = useState('');
  const [selectedTable, setSelectedTable] = useState('');
  const [whereClause, setWhereClause] = useState('');

  const handleSqlTypeChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const statement = event.target.value;

    if (selectedTable) {
      switch (statement) {
        case 'SELECT':
          setInitialSql(`SELECT ${selectedColumn} FROM ${selectedTable} ${whereClause ? `WHERE ${whereClause}` : ''}`);
          break;
        case 'INSERT':
          setInitialSql(`INSERT INTO ${selectedTable} (column1, column2) VALUES (value1, value2)`);
          break;
        case 'UPDATE':
          setInitialSql(`UPDATE ${selectedTable} SET column1 = value1 ${whereClause ? `WHERE ${whereClause}` : ''}`);
          break;
        case 'DELETE':
          setInitialSql(`DELETE FROM ${selectedTable} ${whereClause ? `WHERE ${whereClause}` : ''}`);
          break;
        default:
          break;
      }
    }

    console.log(`initialSql: ${initialSql}`)
    setSelectedStatement(statement);
    handleSqlChange({ target: { value: initialSql } } as React.ChangeEvent<HTMLTextAreaElement>);
}, [initialSql, selectedColumn, selectedTable, whereClause, handleSqlChange]);

  const handleColumnChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    const column = event.target.value;
    setSelectedColumn(column);
    handleSqlChange({ target: { value: initialSql } } as React.ChangeEvent<HTMLTextAreaElement>);
  }, [initialSql, handleSqlChange]);

  const handleTableChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    const table = event.target.value;
    setSelectedTable(table);
    handleSqlChange({ target: { value: initialSql } } as React.ChangeEvent<HTMLTextAreaElement>);
  }, [initialSql, handleSqlChange]);

  const handleWhereClauseChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    const whereClause = event.target.value;
    setWhereClause(whereClause);
    handleSqlChange({ target: { value: initialSql } } as React.ChangeEvent<HTMLTextAreaElement>);
  }, [initialSql, handleSqlChange]);

  const handleClearClick = () => {
    setInitialSql('');
    setSelectedStatement('SELECT');
    setSelectedColumn('');
    setSelectedTable('');
    setWhereClause('');
    handleSqlChange({ target: { value: '' } } as React.ChangeEvent<HTMLTextAreaElement>);
  };

  useEffect(() => {
    handleSqlTypeChange({ target: { value: selectedStatement } } as React.ChangeEvent<HTMLSelectElement>);
  }, [selectedStatement, handleSqlTypeChange]);

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
        {selectedStatement === 'SELECT' && (
          <input
            type="text"
            placeholder="*"
            value={selectedColumn}
            onInput={handleColumnChange as () => void}
          />
        )}
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
              <span className='clause'>{selectedColumn}</span>
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
      <div className="button-area">
        <button
          disabled={!selectedTable}
          onClick={handleTransformChange}
        >
          Transform SQL
        </button>
        <button
          disabled={!selectedTable}
          className="button" onClick={handleClearClick}
        >
          Clear
        </button>
      </div>
    </section>
  );
}

export default Section1;
