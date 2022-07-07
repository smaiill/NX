CREATE TABLE `naf_users` (
  `id` int(11) NOT NULL,
  `identifier` varchar(100) NOT NULL,
  `accounts` longtext DEFAULT '{"bank":0}',
  `permissions` varchar(50) DEFAULT 'user',
  `inventory` longtext DEFAULT NULL,
  `charinfo` longtext DEFAULT '{"firstname":"","lastname":"","dob":"","nationality":"","height":0,"sex":"","job":"unemployed","job_grade":0,"job2":"unemployed2","job2_grade":0}',
  `position` varchar(255) DEFAULT '{"x":-269.4,"y":-955.3,"z":31.2,"heading":205.8}',
  `skin` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


ALTER TABLE `naf_users`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `naf_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;
