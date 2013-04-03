Feature: User can print selected entries from the database
	Background:
		Given empty database
		And the number of backups should be 0
		When I set database contents to:
			"""
			{
			  "site": [
			    {
			      "url": "dropbox.com",
			      "user": "example@dropbox.com",
			      "pass": "password"
			    },
			    {
			      "url": "gmail.com",
			      "user": "example@gmail.com",
			      "pass": "password"
			    }
			}
			"""


	Scenario: Print full database
		And I run cryptobox "cat"
		And I enter correct password
		Then the exit status should be 0
		And the stdout should contain exactly:
			"""
			Password:
			{
			  "site": [
			    {
			      "url": "dropbox.com",
			      "user": "example@dropbox.com",
			      "pass": "password"
			    },
			    {
			      "url": "gmail.com",
			      "user": "example@gmail.com",
			      "pass": "password"
			    }
			}

			"""

	Scenario: Print filtered keys
		And I run cryptobox "cat site url=dropbox"
		And I enter correct password
		Then the exit status should be 0
		And the stdout should contain exactly:
			"""
			Password:
			{
			  "url": "dropbox.com",
			  "user": "example@dropbox.com",
			  "pass": "password"
			}
			]

			"""

	Scenario: Don't print key when number of entries > 1
		And I run cryptobox "cat -k name"
		And I enter correct password
		Then the exit status should be 4
		And the stderr should contain exactly:
			"""
			error: Too many entries!

			"""

	Scenario: Print given key
		And I run cryptobox "cat -k name type_path=webform/dropbox.com"
		And I enter correct password
		Then the exit status should be 0
		And the stdout should contain exactly:
			"""
			Password:
			user
			"""

	Scenario: Print error when key is not found
		And I run cryptobox "cat -k doesnt_exist type_path=webform/dropbox.com"
		And I enter correct password
		Then the exit status should be 5
		And the stderr should contain exactly:
			"""
			error: Key is not found!

			"""
