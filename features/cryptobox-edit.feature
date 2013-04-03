Feature: User edits database
	Scenario: Can't edit database with wrong password
		Given empty database
		When I run cryptobox "edit --stdout"
		And I enter incorrect password
		Then the exit status should be 2
		And the stderr should contain exactly:
			"""
			error: Invalid password!

			"""

	Scenario: Edit via stdio
		Given empty database
		And the number of backups should be 0
		When I set database contents to:
			"""
			webform/dropbox.com:
			  - user:
			      pass: pass
			"""
		And I run cryptobox "edit --stdout"
		And I enter correct password
		Then the exit status should be 0
		And the number of backups should be 1
		And the stdout should contain exactly:
			"""
			Password:
			webform/dropbox.com:
			  - user:
			      pass: pass

			"""

	Scenario: Edit creates portable HTML files
		Given empty database
		When I set database contents to:
			"""
			webform/dropbox.com:
			  - user:
			      pass: pass
			"""
		And I enter correct password
		Then the exit status should be 0
		And file "cryptobox/portable.html" should be generated
		And file "cryptobox/clippy.swf" should be generated

	Scenario: Edit non-existing database
		Given no database
		When I set database contents to:
			"""
			webform/dropbox.com:
			  - user:
			      pass: pass
			"""
		And I enter correct password
		Then the exit status should be 6
		And the stderr should contain exactly:
			"""
			error: Database is not found!

			"""

#	Scenario: Edit invalid format version
#		Given database with wrong format
#		When I run cryptobox "edit --no-edit"
#		And I enter correct password
#		Then the exit status should be 3
#		And the stderr should contain exactly:
#			"""
#			error: Invalid database format!
#
#			"""
