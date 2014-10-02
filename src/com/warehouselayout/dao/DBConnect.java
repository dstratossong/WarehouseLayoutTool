package com.warehouselayout.dao;

import java.sql.Connection;
import java.sql.SQLException;

import org.postgresql.ds.PGSimpleDataSource;

public class DBConnect {
	private Connection connection;
	
	public DBConnect () {
		Connection conn = null;
		try {
			conn = setupSource().getConnection();
			conn.setAutoCommit(true);
			this.connection = conn;
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public Connection getConnection () {
		return this.connection;
	}
//	public void setConnection (Connection connection) {
//		this.connection = connection;
//	}
	
	private PGSimpleDataSource setupSource () {
		
		PGSimpleDataSource dataSource=new PGSimpleDataSource();
		
		dataSource.setServerName(DBConstants.DB_SERVER_ADDRESS);
		dataSource.setDatabaseName(DBConstants.DB_NAME);
		dataSource.setUser(DBConstants.DB_USER_NAME);
		dataSource.setPassword(DBConstants.DB_USER_PASS);
		dataSource.setPortNumber(DBConstants.DB_PORT);
		
		return dataSource;
	}
	
	public void closeConnection (Connection connection) throws SQLException {
		if (connection != null) {
			connection.close();
		}
	}
	
	public void releaseConnections () throws SQLException {
		if (this.connection != null) {
			this.connection.close();
		}
	}
}
